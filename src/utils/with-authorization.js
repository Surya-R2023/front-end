import { useState, useEffect } from "react";

import UserAccessService from "../services/user-access-service";

export const withAuthorization = (WrappedComponent) => (props, state) => {
  const [access, setAccess] = useState({});
  const userAccessService = new UserAccessService();
  useEffect(() => {
    const a = {};
    if (!props.pageId) throw new Error("pageId undefined");
    const check = async () => {
      let { data } = await userAccessService.authorization(props.pageId);
      for (let x of data.feature) {
        let m = x.toLowerCase();
        a[m] = true;
      }
      setAccess(a);
    };
    check();
  }, []);

  return <WrappedComponent {...props} {...access} />;
};
