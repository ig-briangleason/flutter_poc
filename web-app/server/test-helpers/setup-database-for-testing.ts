import { DBHelper } from "@Server/test-helpers/db-helper";

before(async function() {
  this.timeout(process.env.CI ? 30000 : 20000);
  await DBHelper.unlock();
  await DBHelper.setup();
});

after(async () => {
  await DBHelper.unlock();
  await DBHelper.teardown();
});
