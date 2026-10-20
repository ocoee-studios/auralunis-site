# Required screen and input support

Both Ocoee Studios marketing websites must adapt to phones, tablets, laptops, desktops, and TV browsers. Preserve this requirement in every future design change.

## Layout acceptance matrix

| Class | CSS viewport widths to check |
| --- | --- |
| Small phones | 320, 360, 375, 390, 430 |
| Tablets and landscape phones | 667, 768, 820, 1024 |
| Laptops and desktops | 1280, 1440, 1920 |
| Large monitors and TVs | 2560, 3840 |

Test portrait and landscape, browser zoom to 200%, and long translated/accessibility text where applicable. CSS pixels are viewport measurements, not physical panel resolution. TV output and zoom settings vary by browser.

- No clipped headings, overlapping controls, or page-wide horizontal scrolling.
- Product images preserve their aspect ratio; decorative layers never intercept clicks.
- All site buttons, links, disclosures, and screenshot controls remain accessible.
- Large-screen typography and product imagery scale up for readability.
- Keyboard focus is visible; controls work through Tab, Shift+Tab, Enter, and Space as appropriate. Feature tabs support arrow navigation. TV remotes that emulate keyboard/pointer input should be checked on the target TV.
- Touch actions have at least 44px targets where practical; no essential action relies on hover.
- Reduced-motion settings are respected.

## Verification status

Phone/tablet breakpoints, narrow-header guards, flexible image sizing, touch targets, and 1920px/2560px+ display rules are implemented. Source structure and interaction checks run locally. **The visual viewport matrix and actual TV/remote checks are still required before release.** This environment has no supported browser or TV runtime, so code inspection is not a claim that every screen has been visually verified.
