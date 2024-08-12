const validarEntradaDeDados = (lancamento) => {

  const {cpf, valor} = lancamento

  if (!/^\d{11}$/.test(cpf)) {
    return "CPF deve conter apenas caracteres numéricos e ter 11 dígitos."
  }

  if (typeof Number(valor) !== 'number' || isNaN(valor)) {
    return "Valor deve ser numérico."
  }

  if (Number(valor) > 15000) {
    return "Valor não pode ser superior a 15000,00."
  }

  if (Number(valor) < -2000) {
    return "Valor não pode ser inferior a -2000,00."
  }

  const primeiroDigito = (cpf.slice(0, 9)
    .split('')
    .map((digito, index) => parseInt(digito) * (10 - index))
    .reduce((ac, n) => ac + n, 0) * 10) % 11 % 10

  const segundoDigito = (cpf.slice(0, 10)
    .split('')
    .map((digito, index) => parseInt(digito) * (11 - index))
    .reduce((ac, n) => ac + n, 0) * 10) % 11 % 10

  const primeiroVerificador = parseInt(cpf.charAt(9)) === primeiroDigito
  const segundoVerificador = parseInt(cpf.charAt(10)) === segundoDigito

  if (!primeiroVerificador || !segundoVerificador) {
    return "CPF inválido."
  }

  return null
}

const recuperarSaldosPorConta = (lancamentos) => {

  const cpfs = Array.from(new Set(lancamentos.map(lancamento => lancamento.cpf)))
  return cpfs.map(cpf => {

    const saldo = lancamentos.filter(lancamento => lancamento.cpf === cpf)
      .reduce((acc, lancamento) => acc + lancamento.valor, 0)

    return {cpf, valor: saldo}
  })
}

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {

  const lancamentosFiltrados = lancamentos.filter(lancamento => lancamento.cpf === cpf)

  if (lancamentosFiltrados.length === 0) return []
  if (lancamentosFiltrados.length === 1) return [lancamentosFiltrados[0], lancamentosFiltrados[0]]

  const lancamentosOrdenados = lancamentosFiltrados.sort((a, b) => a.valor - b.valor)
  return [lancamentosOrdenados[0], lancamentosOrdenados[lancamentosOrdenados.length - 1]]
}

const recuperarMaioresSaldos = (lancamentos) => {
  return lancamentos
}

const recuperarMaioresMedias = (lancamentos) => {
  return lancamentos
}