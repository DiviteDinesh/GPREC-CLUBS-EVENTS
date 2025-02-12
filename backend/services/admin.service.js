import AdminRequest from "../models/admin.model.js"; 

export const submitRequest = async (requestData) => {
  try {
    const request = new AdminRequest(requestData);
    await request.save();
    return { message: "Request submitted successfully" };
  } catch (err) {
    throw new Error("Error in submitRequest: " + err.message);
  }
};

export const fetchPendingRequests = async () => {
  try {
    return await AdminRequest.find({ status: "pending" });
  } catch (err) {
    throw new Error("Error fetching pending requests: " + err.message);
  }
};
