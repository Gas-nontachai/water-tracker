import { Colors } from '../../constants/theme';

describe('Colors', () => {
  it('defines light and dark palettes', () => {
    expect(Colors.light).toMatchObject({
      text: expect.any(String),
      background: expect.any(String),
      tint: expect.any(String),
    });
    expect(Colors.dark).toMatchObject({
      text: expect.any(String),
      background: expect.any(String),
      tint: expect.any(String),
    });
  });

  it('uses different tint values for light vs dark', () => {
    expect(Colors.light.tint).not.toBe(Colors.dark.tint);
  });
});
