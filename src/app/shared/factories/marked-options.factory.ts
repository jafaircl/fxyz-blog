import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();
  
    renderer.code = (text: string, lang: string, escaped: boolean) => {
      escaped = false;
      return `<pre class="language-${lang}"><code class="language-${lang}">${text}</code></pre>`;
    };
  
    return {
      renderer: renderer,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
    };
}