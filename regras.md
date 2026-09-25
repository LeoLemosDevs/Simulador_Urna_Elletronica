# Regras de Funcionamento - Simulador de Urna Eletrônica (Eleições 2026)

## 🗳️ Ordem de Votação
A votação segue a ordem oficial das eleições de 2026, com a respectiva quantidade de dígitos:
1. **Deputado Federal** - 4 dígitos
2. **Deputado Estadual** - 5 dígitos
3. **Senador 1** - 3 dígitos
4. **Senador 2** - 3 dígitos
5. **Governador** - 2 dígitos
6. **Presidente** - 2 dígitos

---

## 🖥️ Regras de Interação dos Botões

### Botão BRANCO
- **Ação:** Registra o voto como "Em Branco".
- **Condição:** Só funciona se **nenhum** número tiver sido digitado no momento. Se já houver números na tela, o botão é ignorado (ou avisa que é preciso corrigir antes).

### Botão CORRIGE
- **Ação:** Apaga os números digitados na tela atual.
- **Condição:** Permite ao eleitor reiniciar a digitação do voto para o cargo em questão. Não afeta os cargos que já foram votados e confirmados.

### Botão CONFIRMA
- **Ação:** Registra o voto atual e avança para o próximo cargo (ou encerra a votação).
- **Cenários:**
  1. **Voto Válido:** O eleitor digitou o número completo correspondente a um candidato cadastrado.
  2. **Voto Nulo (Candidato Inexistente):** O eleitor digitou um número que não pertence a nenhum candidato ou partido válido.
  3. **Voto Nulo (Sem Digitar):** O eleitor clicou em "Confirma" sem digitar nenhum número e sem ter clicado em "Branco".
  4. **Voto em Branco:** O eleitor clicou na tecla "Branco" previamente e depois confirmou.

---

## 🔄 Fluxo de Encerramento
- Após a confirmação do voto para **Presidente**, a tela será limpa e exibirá a palavra **"FIM"** em destaque.
- O tradicional som prolongado da urna eletrônica ("pililililili") será tocado.
- Os votos registrados ficarão salvos em um array/variável no sistema para possível auditoria/console no simulador.
