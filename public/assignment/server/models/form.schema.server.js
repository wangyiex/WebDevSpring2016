module.exports = function(mongoose,FieldSchema) {

    var FormSchema = mongoose.Schema(
        {
            userId: String,
            title: { type:String, default:"New Form"},
            fields: [FieldSchema],
            created: { type: Date, default: Date.now },
            updated:{ type: Date, default: Date.now },
        }, {collection: 'assignment.formmaker.form'});

    return FormSchema;

};