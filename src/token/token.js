const tokens = {
  ILLEGAL: 'ILLEGAL',
  EOF: 'EOF',
  IDENT: 'IDENT',
  INT: 'INT',

  // Operators
  ASSIGN: '=',
  PLUS: '+',
  MINUS: '-',
  BANG: '!',
  ASTERISK: '*',
  SLASH: '/',
  LT: '<',
  GT: '>',
  EQ: '==',
  NOT_EQ: '!=',

  // Delimeters
  COMMA: ',',
  SEMICOLON: ';',

  LPAREN: '(',
  RPAREN: ')',
  LBRACE: '{',
  RBRACE: '}',

  // Keywords
  FUNCTION: 'FUNCTION',
  LET: 'LET',
  TRUE: 'TRUE',
  FALSE: 'FALSE',
  IF: 'IF',
  ELSE: 'ELSE',
  RETURN: 'RETURN'
}

const keywords = {
  fn: 'FUNCTION',
  let: 'LET',
  true: 'TRUE',
  false: 'FALSE',
  if: 'IF',
  else: 'ELSE',
  return: 'RETURN'
}

const lookupIdent = ident => (keywords[ident] ? keywords[ident] : 'IDENT')

module.exports = { tokens, keywords, lookupIdent }
