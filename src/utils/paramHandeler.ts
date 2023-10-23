import { JsonType, searchParamType } from "@/types/utils";

// Function to encode JSON data into base64 format
export const encodeJSONToBase64 = (data: any):string => {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString);
};

// Function to decode base64 data into JSON
export const decodeBase64ToJSON = (base64Data: string) => {
  try{

    const jsonString = atob(base64Data);
    return JSON.parse(jsonString);
  } catch (e) {
    return {"error": e}
  }
};

// function to convert a JSON object to URL search parameters
export const jsonToSearchParameters = (jsonData: JsonType):string => {
  const searchParams = new URLSearchParams(jsonData)
  return searchParams.toString()
}

const useParamParser = (params:  searchParamType) => {
  const stringifiedData =  jsonToSearchParameters(params);
  const privateData = params._s ? decodeBase64ToJSON(params._s as string): {}
  return {
    stringifiedData,
    privateData,
  };
};

export default useParamParser;
