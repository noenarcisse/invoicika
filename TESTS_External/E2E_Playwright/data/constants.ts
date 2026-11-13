const required = (n: string) => {
    if (process.env[n] === undefined) {
        throw new Error(`${n} non trouvé dans l'environnement`);
    }
    return process.env[n];
};

export const ADMIN = {
    name: required("ADMIN_USER"),
    pwd: required("ADMIN_PWD"),
};

export const EMPLOYE = {
    name: required("EMPLOYE_USER"),
    pwd: required("EMPLOYE_PWD"),
};
