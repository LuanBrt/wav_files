# Wav Files

## Preview locally

The HTML posts are loaded with `fetch`, so do not open `index.html` by double-clicking it (`file://` URLs are blocked by browsers).

From this folder, start a tiny local web server instead:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. Stop the server with `Ctrl+C` when you are done.

On GitHub Pages this works automatically because the site is served over HTTPS.

## Add a post

1. Create a file in `posts/`, such as `posts/my-new-post.html`, containing the body of your post:

   ```html
   <p>Your post text goes here.</p>
   <h2>A section heading</h2>
   <p>You can use normal HTML.</p>
   ```

2. Add its card information to `posts/index.json`:

   ```json
   {
     "file": "my-new-post.html",
     "title": "My new post",
     "date": "2026-09-26",
     "description": "A short summary for the card."
   }
   ```
