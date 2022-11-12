import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.REACT_APP_SUPABASEURL, process.env.REACT_APP_APIKEY);


export async function uploadImage(name, img) {
    const { data, error } = await supabase.storage
        .from('public')
        .upload(`images/${name}`, img, {
            cacheControl: '3600',
            upsert: false
        })

    return { data: data, error };
}

export async function getImage(path) {
    const { data, error } = await supabase.storage.from('public').download(`images/${path}`)
    console.log(data)

    return { data: data, error };
}

export async function selectMaxScore() {
    let { data: maxscore, error } = await supabase
        .from('maxscore')
        .select('*')
        .limit(10);

    return { data: maxscore, error };
}
export async function insertScore(dados) {
    const { data, error } = await supabase
        .from('score_users')
        .insert(dados)
    return { data, error };
}

export async function selectAllThemes() {
    let { data: theme, error } = await supabase
        .from('theme')
        .select('*')
    return { data: theme, error };
}
export async function selectAll() {
    var { data: allquestions, error } = await supabase
        .from('allquestions')
        .select('*')
    return { data: allquestions, error };
}

export async function selectAllPagination(min, max) {
    var { data: questions, error } = await supabase
        .from('questions')
        .select('*')
        .range(min, max);
    return { data: questions, error };
}

export async function selectAllPaginationEASY(min, max) {
    var { data: questions, error } = await supabase
        .from('questions')
        .select('*')
        .eq('difficulty', 'E')
        .range(min, max);
    return { data: questions, error };
}

export async function selectAllPaginationMEDIUM(min, max) {
    var { data: questions, error } = await supabase
        .from('questions')
        .select('*')
        .eq('difficulty', 'M')
        .range(min, max);
    return { data: questions, error };
}

export async function selectAllPaginationHARD(min, max) {
    var { data: questions, error } = await supabase
        .from('questions')
        .select('*')
        .eq('difficulty', 'H')
        .range(min, max);
    return { data: questions, error };
}

export async function selectAllQtd() {
    var { count, error } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true })
    return { count, error };
}

export async function selectAllQtdEASY() {
    var { count, error } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('difficulty', 'E')
    return { count, error };
}

export async function selectAllQtdMEDIUM() {
    var { count, error } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('difficulty', 'M');
    return { count, error };
}

export async function selectAllQtdHARD() {
    var { count, error } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('difficulty', 'H');
    return { count, error };
}

export async function insert(dados) {
    var { data, error } = await supabase
        .from('questions')
        .insert([
            dados
        ])
    return { data, error };
}

export async function update(id, dados) {
    var { data, error } = await supabase
        .from('questions')
        .update(dados)
        .eq('id', id)
    return { data, error };
}

export async function deleteR(id) {
    var { data, error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id)
    return { data, error };
}

// const options = {
//     db: {
//         schema: 'public',
//     },
//     auth: {
//         autoRefreshToken: true,
//         persistSession: true,
//         detectSessionInUrl: true
//     },
//     global: {
//         headers: { 'x-my-custom-header': 'my-app-name' },
//     },
// }