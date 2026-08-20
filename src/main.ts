import { Application } from "./framework/application/application";
import { middlewares } from "./middlewares/middlewares";

const app = new Application()

app.use(middlewares.logger)
app.use(middlewares.auth)

app.bootstrap();
app.listen(8080)
