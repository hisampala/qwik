import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Users } from "~/model/users";

export default component$(() => {
    const location = useLocation()
    const id  = location.params.id;
    const UsersResource = useResource$<Users>(async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const users = await res.json()
        return users
      });
    return (
        <div>
             <Resource
        value={UsersResource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Failed to load Users</div>}
        onResolved={(user): any => {
            return (
              <div class="shadow">
                <ul>
                  <h3> Name User: {user.name} </h3>
                  <li>company : {user.company.name}</li>
                  <li> tel : {user.phone} </li>
                  <li> website : {user.website} </li>
                  <li> Addreee : city {user.address.city} </li>
                </ul>
              </div>
            );
        }}
      />
        </div>
    )
});
