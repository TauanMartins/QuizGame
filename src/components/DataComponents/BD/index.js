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
    const { data, error } = await supabase.storage.from('public')
        .download(`images/${path}`);

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
export async function selectAllByTheme(tema) {
    var data, error, response;
    if (tema && tema[0] !== '1') {
        response = await supabase
            .from('allquestions')
            .select('*')
            .in('idtheme', tema);
    } else {
        response = await supabase
            .from('allquestions')
            .select('*')
    }
    data = response.data
    error = response.error
    return { data, error };
}
export async function selectAllPagination(min, max) {
    var { data: questions, error } = await supabase
        .from('questions')
        .select('*')
        .range(min, max);
    return { data: questions, error };
}

export async function selectAllPaginationEASY(min, max, tema) {
    var data, error, response;
    if (tema && tema[0] !== '1') {
        console.log('aqui')
        response = await supabase
            .from('questions')
            .select('*')
            .eq('difficulty', 'E')
            .in('theme_fk', tema)
            .range(min, max);
    } else {
        console.log('aqui2')
        response = await supabase
            .from('questions')
            .select('*')
            .eq('difficulty', 'E')
            .range(min, max);
    }
    data = response.data
    error = response.error
    return { data, error };
}

export async function selectAllPaginationMEDIUM(min, max, tema) {
    var data, error, response;
    if (tema && tema[0] !== '1') {
        response = await supabase
            .from('questions')
            .select('*')
            .eq('difficulty', 'M')
            .in('theme_fk', tema)
            .range(min, max);
    } else {
        response = await supabase
            .from('questions')
            .select('*')
            .eq('difficulty', 'M')
            .range(min, max);
    }
    data = response.data
    error = response.error
    return { data, error };
}

export async function selectAllPaginationHARD(min, max, tema) {
    var data, error, response;
    if (tema && tema[0] !== '1') {
        response = await supabase
            .from('questions')
            .select('*')
            .eq('difficulty', 'H')
            .in('theme_fk', tema)
            .range(min, max);
    } else {
        response = await supabase
            .from('questions')
            .select('*')
            .eq('difficulty', 'H')
            .range(min, max);
    }
    data = response.data
    error = response.error
    return { data, error };
}

export async function selectAllQtd(tema) {
    var count, error, response;
    if (tema && tema[0] !== '1') {
        response = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .in('theme_fk', tema)
    } else {
        response = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
    }
    count = response.count
    error = response.error
    return { count, error };
}

export async function selectAllQtdEASY(tema) {
    var count, error, response;
    if (tema && tema[0] !== '1') {
        response = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('difficulty', 'E')
            .in('theme_fk', tema)
    } else {
        response = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('difficulty', 'E')
    }
    count = response.count
    error = response.error
    return { count, error };
}

export async function selectAllQtdMEDIUM(tema) {
    var count, error, response;
    if (tema && tema[0] !== '1') {
        response = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('difficulty', 'M')
            .in('theme_fk', tema)
    } else {
        response = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('difficulty', 'M')
    }
    count = response.count
    error = response.error
    return { count, error };
}

export async function selectAllQtdHARD(tema) {
    var count, error, response;
    if (tema && tema[0] !== '1') {
        response = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('difficulty', 'H')
            .in('theme_fk', tema)
    } else {
        response = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('difficulty', 'H')
    }
    count = response.count
    error = response.error
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