# My Portfolio

A simple static portfolio site. No build tools needed.

## Files

| File | Purpose |
|------|---------|
| `data.js` | **Your content.** Name, links, tabs, and all work items. The only file you edit regularly. |
| `index.html` | Page structure |
| `style.css` | Look and feel (colors are at the top of the file) |
| `script.js` | Builds tabs, filters and cards from `data.js` |
| `assets/` | Your images, videos and `.blend` files, one folder per tab |

## Put it online with GitHub Pages

1. Create a GitHub account and a new **public** repository.
   - Name it `your-username.github.io` to get the address `https://your-username.github.io`, or use any name (address becomes `https://your-username.github.io/repo-name`).
2. Upload all files from this folder (drag and drop works on the GitHub web page: **Add file → Upload files**), including the `assets` folder.
3. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. Wait 1 to 2 minutes, then open your site address.

To preview locally, just double-click `index.html`.

## Add your Blender proof

1. Put files in `assets/blender/` (e.g. `chair-render.jpg`, `chair-wireframe.jpg`, `turntable.mp4`, `chair.blend`).
2. In `data.js`, edit the items under the `blender` category to point to your files.
3. Commit and push. The site updates in about a minute.

Good "proof" for 3D work: final render, wireframe/topology shot, viewport screenshot showing the Blender UI, a timelapse of the process, and the `.blend` file for download.

## Add a new tab (new skill)

In `data.js`, copy a whole block inside `CATEGORIES` and change it:

```js
,{
  id: "web",                    // lowercase, no spaces
  label: "Web Development",     // tab text
  description: "Sites I've built.",
  items: [
    { title: "Landing Page", tag: "HTML/CSS", type: "image", src: "assets/web/landing.png" }
  ]
}
```

Create the matching folder `assets/web/` for its files. That's it: the tab appears automatically.

## Subcategories

Give items a `tag` such as `"Modeling"`, `"Texturing"`, `"Animation"`. When a tab has two or more different tags, filter buttons appear on their own. No extra setup.

## Tips and limits

- GitHub blocks single files over **100 MB**. For long videos, upload to YouTube and use `type: "youtube"`.
- Keep images around 1 to 2 MB (export JPG or WebP) so the page loads fast.
- For interactive 3D, upload the model to Sketchfab and use `type: "sketchfab"`.
- Change the accent color by editing `--accent` at the top of `style.css`.
