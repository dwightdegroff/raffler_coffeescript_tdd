window.Raffler =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: -> 
    #console.log 'Hello from Backbone!'
    #view = new Raffler.Views.EntriesIndex()
    #$('#container').html(view.render().el)
    new Raffler.Routers.Entries
    Backbone.history.start()

#class Raffler.Collections.Entries extends Backbone.Collection
#  url: '/~degroff1/is698cs/p4nc4kes/week12/api'

class Raffler.Views.EntriesIndex extends Backbone.View
  template: _.template($('#item-template').html())
  events:
    'click #new': 'createEntry'
    'click #draw': 'drawWinner'
    'click #reset': 'resetWinner'
    'click li': 'kill'
  initialize: ->
    @collection.on('sync', @render, this)
    @collection.on('add', @render, this)
    @collection.on('destroy', @render, this)
  render: ->
    $(@el).html(@template(entries: @collection.toJSON()))
    this
  createEntry: ->
    @collection.create name: $('#new_entry').val()
  drawWinner: ->
    @collection.drawWinner();
  drawWinner: ->
    winner = @collection.shuffle()[0]
    if winner
      winner.set(winner:true)
      winner.save()    
  kill: (ev) ->
    console.log $(ev.target).attr('id') # log the jquery selector for debug
    item=@collection.find (model) ->
      model.get("id") is $(ev.target).attr('id')
    item.destroy()
  resetWinner: ->
    @collection.each (model, index) ->
      model.set(winner:false)
      model.save()
    

class Raffler.Routers.Entries extends Backbone.Router
  routes:
    '': 'index'
    'entries/:id': 'show'
  initialize: ->
    # USE THIS TO CALL PHP!@collection = new Raffler.Collections.Entries()
    @collection = new Raffler.Collections.Entries([{id: 1, name: "kip", winner: false}, {id:2, name: "dwight", winner: true}]) # PRETEND PHP CALL
    @collection.fetch() #this makes a call to the server and populates the collection           
  index: ->
    view = new Raffler.Views.EntriesIndex(collection: @collection)
    $('#container').html(view.render().el)
  show: (id) ->
    console.log "Entry #{id}"

class Raffler.Models.Entry extends Backbone.Model
  defaults: 
    name:'Dwight'
    winner: false

class Raffler.Collections.Entries extends Backbone.Collection
  model: Raffler.Models.Entry
  localStorage: new Store("backbone-coffee-raffle-reset")




$(document).ready ->
  Raffler.init()
