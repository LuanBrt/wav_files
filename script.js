document.querySelector('#year').textContent = new Date().getFullYear();

const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

async function getPostIndex() {
  const response = await fetch('posts/index.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Post index not found');
  return response.json();
}

async function loadPostList() {
  const container = document.querySelector('#posts');
  if (!container) return;
  try {
    const posts = await getPostIndex();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    container.replaceChildren();
    posts.forEach((post) => {
      const article = document.createElement('article');
      article.className = 'post';
      const url = `post.html?post=${encodeURIComponent(post.file)}`;
      article.innerHTML = `<p class="post-date">${escapeHtml(post.date || '')}<span>${escapeHtml(post.category || 'NOTE')}</span></p><h3><a href="${url}">${escapeHtml(post.title || 'Untitled post')}</a></h3><p>${escapeHtml(post.description || '')}</p>`;
      container.append(article);
    });
  } catch {
    container.innerHTML = '<p class="loading-posts">Posts could not be loaded.</p>';
  }
}

async function loadSinglePost() {
  const container = document.querySelector('#post-content');
  if (!container) return;
  const filename = new URLSearchParams(window.location.search).get('post');
  if (!filename || !/^[\w-]+\.html$/.test(filename)) { container.innerHTML = '<p>That post does not exist.</p>'; return; }
  try {
    const posts = await getPostIndex();
    const post = posts.find((item) => item.file === filename);
    if (!post) throw new Error('Post is not indexed');
    const response = await fetch(`posts/${filename}`);
    if (!response.ok) throw new Error('Post not found');
    const content = await response.text();
    document.title = `${post.title || 'Post'} — Wav Files`;
    container.innerHTML = `<a class="back-link" href="index.html#writing">← ALL WRITING</a><h1 class="post-page-title">${escapeHtml(post.title || 'Untitled post')}</h1><div class="post-body">${content}</div>`;
    try {
      await MathJax.startup.promise;
      await MathJax.typesetPromise([container]);
    } catch (error) {
      console.error('MathJax rendering failed :( :', error);
    }
  } catch {
    container.innerHTML = '<a class="back-link" href="index.html#writing">← ALL WRITING</a><p>That post could not be found.</p>';
  }
}

loadPostList();
loadSinglePost();
