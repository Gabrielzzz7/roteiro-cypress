describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  });

  it('Insere uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software');
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Edita uma tarefa existente', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa antiga{enter}');

    cy.get('[data-cy=todos-list] > li label')
      .dblclick();

    cy.get('[data-cy=todos-list] > li.editing input.edit')
      .clear()
      .type('Tarefa editada{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa editada');
  });


  it('Marca e desmarca uma tarefa como completa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa para completar{enter}');

    cy.get('[data-cy=toggle-todo-checkbox]')
      .check()
      .should('be.checked');

    cy.get('[data-cy=toggle-todo-checkbox]')
      .uncheck()
      .should('not.be.checked');
  });

  it('Não adiciona tarefa vazia', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('{enter}'); // Simula enter com input vazio

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });
});
