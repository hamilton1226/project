import AbstractDeleteController from 'hospitalrun/controllers/abstract-delete-controller';    
export default AbstractDeleteController.extend({
    needs: 'visits/edit',
    
    afterDeleteAction: 'notifyProcedureDelete',
    editController: Ember.computed.alias('controllers.visits/edit'),
    title: 'Delete Procedure',
    
    actions: {
        notifyProcedureDelete: function() {
            this.send('modalClose');
            this.get('editController').send('deleteProcedure', this.get('model'));
        }
    }
});