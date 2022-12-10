import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import { Users } from "~/model/users";

export default component$(() => {
  const location = useLocation();
  
  
  const UsersResource = useResource$<Users[]>(async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    return users;
  });
  return (
    <div>
      <h3>Users </h3>
      <Resource
        value={UsersResource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Failed to load Users</div>}
        onResolved={(users): any => {
          return users.map((user) => {
            return (
              <div class="shadow">
                <ul>
                  <h3> Name User: {user.name} </h3>
                  <li>company : {user.company.name}</li>
                  <li> tel : {user.phone} </li>
                  <li> website : {user.website} </li>
                  <li> Addreee : city {user.address.city} </li>
                  <li>
                    {" "}
                    <a href={location.pathname + user.id}>
                      {" "}
                      search detail user
                    </a>{" "}
                  </li>
                </ul>
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
