import { component$, Resource, useResource$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Post } from "~/model/post";

export default component$(() => {
  const PostResource = useResource$<Post[]>(async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    let posts:Post[] = await res.json();
    posts = posts.map((u, i) => {
      if (i < 5) {
        return u;
      }
    });
    return posts;
  });
  return (
    <div>
      <Resource
        value={PostResource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Failed to load Users</div>}
        onResolved={(Posts): any => {
          return Posts.map((post, i) => {
            const idx = i + 1;
            return (
              <div class="cards">
                <div class={`card card-${idx}`}>
                  <div class="card__icon">
                    <i class="fas fa-bolt"></i> {post.title}
                  </div>
                  <p class="card__exit">
                    <i class="fas fa-times"></i>
                  </p>
                  <h2 class="card__title">{post.body}</h2>
                  <p class="card__apply">
                    <a class="card__link" href="#">
                      Apply Now <i class="fas fa-arrow-right"></i>
                    </a>
                  </p>
                </div>
              </div>
            );
          });
        }}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Users Pages",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
