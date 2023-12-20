export function generateEmailAddress(firstname: string, lastname: string): string {
    const domain = "garage-vincent-parrot.fr";
    const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@${domain}`;

    return email;
}

