import { expect, test } from '@playwright/test';

test('renders knob demo and supports click-to-type, drag, style switch, and options', async ({
	page
}) => {
	await page.goto('/');

	await expect(page.getByText('svelte-dj-knob')).toBeVisible();

	const valueInput = page.locator('input[type="text"]');
	await expect(valueInput).toHaveValue('0');

	// Disable pointer lock so synthetic mouse drag uses pointer capture in headless Chromium
	const lockCheckbox = page.getByLabel('Lock Cursor');
	await expect(lockCheckbox).toBeChecked();
	await lockCheckbox.uncheck();
	await expect(lockCheckbox).not.toBeChecked();

	// Clicking the knob circle without dragging selects the input
	const knobCircle = page.locator('circle.knobBg');
	const box = await knobCircle.boundingBox();
	expect(box).not.toBeNull();
	const cx = box!.x + box!.width / 2;
	const cy = box!.y + box!.height / 2;

	await page.mouse.click(cx, cy);
	await expect(valueInput).toBeFocused();

	// Typing a new numeric value updates the knob
	await valueInput.fill('42');
	await valueInput.press('Enter');
	await valueInput.blur();
	await expect(valueInput).toHaveValue('42');

	// Typing a non-numeric value restores the previous formatted value
	await valueInput.focus();
	await valueInput.fill('not-a-number');
	await valueInput.press('Enter');
	await valueInput.blur();
	await expect(valueInput).toHaveValue('42');

	// Dragging up increases the value
	await page.mouse.move(cx, cy);
	await page.mouse.down();
	await page.mouse.move(cx, cy - 20, { steps: 5 });
	await page.mouse.up();
	const afterDrag = Number(await valueInput.inputValue());
	expect(afterDrag).toBeGreaterThan(42);

	// Switching to Elegant style preserves the bound value
	const styleSelect = page.locator('select');
	await styleSelect.selectOption('elegant');
	await expect(page.locator('.ElegantKnob')).toBeVisible();
	await expect(page.locator('input[type="text"]')).toHaveValue(String(afterDrag));
});
