import knex from '../config/conexao.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const autenticar = async (req, res) => {
  const { login, senha } = req.body
  try {
    const usuario = await knex('usuario').where('login', login).first()

    if (!usuario) {
      return res.status(400).json({ mensagem: 'Login incorreto!' })
    }

    const confirmarSenha = await bcrypt.compare(senha, usuario.senha)

    if (!confirmarSenha) {
      return res.status(400).json({ mensagem: 'Senha incorreta!' })
    }

    const token = jwt.sign({ id: usuario.id }, process.env.senha, {
      expiresIn: '1d',
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
    })

    res.status(200).json({ mensagem: 'Login efetuado com sucesso!' })
  } catch (error) {
    res.status(error.status || 500).json({ mensagem: 'Erro interno do servidor.' })
  }
}

const logout = (req, res) => {
  res.clearCookie('token')
  res.redirect('/login')
}

export { autenticar, logout }