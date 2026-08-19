import { Application } from "./framework/application/application";

const app = new Application()

app.bootstrap();
app.listen(8080)
