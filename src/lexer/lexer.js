const { tokens, lookupIdent } = require('../token/token')
const token = tokens

const readChar = l => {
  l.ch = l.readPosition >= l.input.length ? '' : l.input[l.readPosition]
  l.position = l.readPosition
  l.readPosition++
}

const newLexer = input => {
  let l = {
    input: input,
    position: 0,
    readPosition: 0,
    ch: ''
  }

  readChar(l)
  return l
}

const nextToken = l => {
  let tok = {
    type: '',
    literal: ''
  }

  skipWhitespace(l)

  switch (l.ch) {
    case '=':
      if (peekChar(l) == '=') {
        const ch = l.ch
        readChar(l)
        literal = ch + l.ch
        tok = newToken(token.EQ, literal)
      } else {
        tok = newToken(token.ASSIGN, l.ch)
      }
      break
    case ';':
      tok = newToken(token.SEMICOLON, l.ch)
      break
    case '(':
      tok = newToken(token.LPAREN, l.ch)
      break
    case ')':
      tok = newToken(token.RPAREN, l.ch)
      break
    case ',':
      tok = newToken(token.COMMA, l.ch)
      break
    case '+':
      tok = newToken(token.PLUS, l.ch)
      break
    case '-':
      tok = newToken(token.MINUS, l.ch)
      break
    case '*':
      tok = newToken(token.ASTERISK, l.ch)
      break
    case '/':
      tok = newToken(token.SLASH, l.ch)
      break
    case '<':
      tok = newToken(token.LT, l.ch)
      break
    case '>':
      tok = newToken(token.GT, l.ch)
      break
    case '{':
      tok = newToken(token.LBRACE, l.ch)
      break
    case '}':
      tok = newToken(token.RBRACE, l.ch)
      break
    case '!':
      if (peekChar(l) == '=') {
        const ch = l.ch
        readChar(l)
        literal = ch + l.ch
        tok = newToken(token.NOT_EQ, literal)
      } else {
        tok = newToken(token.BANG, l.ch)
      }
      break
    case '':
      tok.literal = ''
      tok.type = token.EOF
      break
    default:
      if (isLetter(l.ch)) {
        tok.literal = readIdentifier(l)
        tok.type = lookupIdent(tok.literal)
        return tok
      } else if (!isNaN(l.ch)) {
        tok.literal = readNumber(l)
        tok.type = token.INT
        return tok
      }
      tok = newToken(token.ILLEGAL, l.ch)
      break
  }

  readChar(l)
  return tok
}

const peekChar = l => {
  if (l.readPosition >= l.input.length) {
    return ''
  }
  return l.input[l.readPosition]
}

const readIdentifier = l => {
  const position = l.position
  while (isLetter(l.ch)) {
    readChar(l)
  }
  return l.input.substring(position, l.position)
}

const readNumber = l => {
  const position = l.position
  while (!isNaN(l.ch)) {
    readChar(l)
  }
  return l.input.substring(position, l.position).trim()
}

const newToken = (tokenType, char) => ({ type: tokenType, literal: char })

const isLetter = ch =>
  ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z') || ch == '_'

const skipWhitespace = l => {
  while (l.ch == ' ' || l.ch == '\t' || l.ch == '\n' || l.ch == '\r') {
    readChar(l)
  }
}

module.exports = {
  newLexer,
  readChar,
  nextToken
}
