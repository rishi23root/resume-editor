import { ExternalAccount, User } from "@clerk/nextjs/server";


export async function checkIfFromLinkedin(user:User|null): Promise< ExternalAccount| Boolean> {
    // loop through the accounts and check provider
    var data = user?.externalAccounts.filter(account => account.verification?.strategy.includes('oauth_linkedin')) as ExternalAccount[];
    var account : ExternalAccount| Boolean = false;
    if (data.length > 0) account = data[0]
    return account;
}

// get linkedin auto from cleck backend 
export async function getLinkedinAuth(user:User|null): Promise<null|any> {
    const ifAccount = await checkIfFromLinkedin(user)
    if (!ifAccount) return null
    // extract the account info from backend, using fetch request from the server

    
}