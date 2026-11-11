# Assets to copy into the host's public folder

`TokenPage` references these two images by absolute URL, so they must be
served from the host site's web root at exactly these paths:

```
public/images/Build for agents.jpg
public/images/optimization.png
```

Copy the `images/` folder here into the host's `public/` directory. If
the host serves static files from somewhere else, move them there and
update the two `src` values in `TokenPage.js` to match.

Nothing else in either portable bundle loads a file by URL.
