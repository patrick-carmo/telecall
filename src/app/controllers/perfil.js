const knex = require('../config/conexao')
const jwt = require('jsonwebtoken')

const perfilUsuario = async (req, res) => {
  const token = req.session.token
  const acesso = req.query.acesso
  try {
    const { id } = jwt.verify(token, process.env.senha)

    if (acesso !== 'botao') {
      return res.redirect('/')
    }

    const dados = await knex('usuario')
      .select('usuario.*', 'endereco.*')
      .leftJoin('usuario_endereco', 'usuario.id', 'usuario_endereco.usuario_id')
      .leftJoin('endereco', 'usuario_endereco.endereco_id', 'endereco.id')
      .where('usuario.id', id)
      .first()

    res.status(200).json(dados)
  } catch (error) {
    return res.status(500).json({ mensagem: error.message })
  }
}

module.exports = perfilUsuario
