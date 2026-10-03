import { e2eAdminSupabase } from "../testUtilities";


export async function createTestUser(email: string, password: string) {

    const { data, error } = await e2eAdminSupabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true
    });

    if(error) throw error;

    return data.user;
}

export async function deleteTestFlights(userId: string) {
    const { error } = await e2eAdminSupabase
        .from("flights")
        .delete()
        .eq("user_id", userId);

    if (error) {
        throw error;
    }
}

export async function deleteTestuser(userId: string) {

    const { error } = await e2eAdminSupabase.auth.admin.deleteUser(userId);

    if(error) throw error;

}

export async function getUserIdByEmail(email: string): Promise<string | null> {
    
    const { data, error } = await e2eAdminSupabase.rpc(
        "get_user_id_by_email",
        { p_email: email, }
    );

    if (error) throw error;

    return data?.[0]?.id ?? null;
}