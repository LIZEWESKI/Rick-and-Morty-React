import { createServer, Model, Response } from "miragejs"

export function makeServer(){
    createServer({
        models: {
            // vans: Model,
            users: Model
        },
        seeds(server) {
            
            // server.create("van", { id: "6", name: "Green Wonder", price: 70, description: "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged", hostId: "123" })
            server.create("user", { id: "1414", email: "iamjerry@dub.com", password: "jerry123**", name: "Jerry" })
        },

        routes() {
            this.namespace = "api"
            this.logging = false
            this.passthrough("https://rickandmortyapi.com/**")
            // this.timing = 2000

            // this.get("/vans", (schema, request) => {
            //     // return new Response(400, {}, {error: "Error fetching data"})
            //     return schema.vans.all()
            // })
            
            // this.get("/vans/:id", (schema, request) => {
            //     // return new Response(400, {}, {error: "Error fetching data"})
            //     const id = request.params.id
            //     return schema.vans.find(id)
            // })

            // this.get("/host/vans", (schema, request) => {
            //     // return new Response(400, {}, {error: "Error fetching data"})
            //     // Hard-code the hostId for now
            //     return schema.vans.where({ hostId: "123" })
            // })
            
            // this.get("/host/vans/:id", (schema, request) => {
            //     // return new Response(400, {}, {error: "Error fetching data"})
            //     // Hard-code the hostId for now
            //     const id = request.params.id
            //     return schema.vans.findBy({ id, hostId: "123" })
            // })

            
            this.post("/login", (schema, request) => {
                const { email, password } = JSON.parse(request.requestBody)
                // This is an extremely naive version of authentication. Please don't
                // do this in the real world, and never save raw text passwords
                // in your database 😇
                const foundUser = schema.users.findBy({ email, password })
                if (!foundUser) {
                    return new Response(401, {}, { message: "No user with those credentials found!" })
                }
                // At the very least, don't send the password back to the client 😅
                foundUser.password = undefined
                return {
                    user: foundUser,
                    token: "Enjoy your pizza, here's your tokens."
                }
            })
        }
    })
}