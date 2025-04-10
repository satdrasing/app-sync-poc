export const lambdaHandler = async (event, context) => {

  console.log(`event >`, JSON.stringify(event, null, 2))
  const response = {
    isAuthorized: false
  };
  try {
    const { authorizationToken } = event;
    if (!authorizationToken) throw new Error("No token in the request");


    if (authorizationToken === "1234") {
      response.isAuthorized = true;
    }

    return response;
  }
  catch (error) {
    console.log(error);
    return response;
  }
};
