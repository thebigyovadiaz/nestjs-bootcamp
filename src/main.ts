import { Application } from "./framework/application/application";
import { container } from "./framework/container/container";

const app = new Application(container)

app.bootstrap();
app.listen(8080)
