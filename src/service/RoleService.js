
const adminRole = "ROLE_ADMIN";

const isAdmin = () => {
    let roles = localStorage.getItem("userRoles");
    return roles != null && roles.includes(adminRole);
}

const RoleService = {
    isAdmin
}

export default RoleService;