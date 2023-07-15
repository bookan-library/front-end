import { number, object, string } from "yup";

export let newsletterSchema = object({
  email: string().required().email(),
});
