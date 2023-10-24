import knex from '../config/conexao.js'

async function consultarUsuarios(filtros, idUsuario) {
  try {
    const query = knex('usuario').select('*')

    if (Object.keys(filtros).length > 0) {
      query.where(filtros)
    }

    if (idUsuario) {
      query.whereNot('id', idUsuario)
    }

    const resultado = await query

    return resultado
  } catch (error) {
    console.error('Erro na consulta:', error.message)
    throw error
  }
}

export default consultarUsuarios
