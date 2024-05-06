export default function isAdminUser() {
    let roles = localStorage.getItem("userRoles");
    return roles != null && roles.includes("ROLE_ADMIN");
}
