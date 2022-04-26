import { createParamDecorator } from "routing-controllers";
import { AppEnv } from "../../configs/environment/app-env";
import { AuthorizedApiKeyException } from "../exceptions/AuthorizedApiKeyException";

export function AuthorizedApiKey(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: action => {
      const xApiKeyHead = action.request.headers['x-api-key'];
      const xApiKey = new AppEnv().xApiKey;
      if (xApiKey !== xApiKeyHead) {
        throw new AuthorizedApiKeyException("");
      }      
      return false
    },
  });
}