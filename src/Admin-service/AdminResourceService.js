import axios from "axios"
const ADMINRESOURCE_URL = "http://localhost:9091/adminResource/"
const ADMINADDALLOCATION_URL = "http://localhost:9093/allocation/"
const USERREQUEST_URL = "http://localhost:9092/userRequest/"
class AdminResourceService
{
    getAllResources() {
		return axios.get(ADMINRESOURCE_URL + 'adminList')
	}
    getAllAllocations() {
		return axios.get(ADMINADDALLOCATION_URL + 'getAllAllocations')
	}
	getAllUserRequest() {
		return axios.get(USERREQUEST_URL + 'requestList')
	}
    getById(id) {
		return axios.get(ADMINRESOURCE_URL + 'get/'+id)
	}

	getByUserId(id) {
		return axios.get(USERREQUEST_URL + 'get/'+id)
	}
    addResource(resource) {
		return axios.post(ADMINRESOURCE_URL + 'adminSave',resource)
	}
	addUserRequest(userRequest) {
		return axios.post(USERREQUEST_URL + 'requestSave',userRequest)
	}
    searchResourceByName(name){
        return axios.get(ADMINRESOURCE_URL + 'searchName/'+name)
    }
    searchResourceByType(type){
        return axios.get(ADMINRESOURCE_URL + 'searchType/'+type)
    }
	
    deleteResource(id) {
		return axios.delete(ADMINRESOURCE_URL + 'adminDelete/' + id)
	}
    deleteAllocation(id) {
		return axios.delete(ADMINADDALLOCATION_URL + 'delete/' + id)
	}
    editResource(resource, id) {
		return axios.put(ADMINRESOURCE_URL + 'adminUpdate/' + id, resource)
	}
	editUserRequest(userRequest, id) {
		return axios.put(USERREQUEST_URL + 'requestUpdate/' + id, userRequest)
	}
	allocateResource(id) {
		return axios.post(ADMINADDALLOCATION_URL + 'allocateResource/' + id)
	}
	deAllocateResource(id) {
		console.log("in api")
		return axios.put(ADMINADDALLOCATION_URL + 'deAllocateResource/' + id, {})
	}
}
export default new AdminResourceService();