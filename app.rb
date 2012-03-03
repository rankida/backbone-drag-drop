require 'rubygems'
require 'sinatra'
require 'json'

# Search Options
#   :description - Shown to the user as an option
#   :hash - put in the url as a 'shortcut to this filter'
searchOptions = [
	{:description => "Ready to be assigned", :hash=>"ReadyToBeAssigned", :base_url=>"/work.json" },
	{:description => "In Progress",          :hash=>"InProgress",        :base_url=>"/work.json" },
	{:description => "Specific Work",        :hash=>"SpecificWork",      :base_url=>"/work.json",
	  :options=>[{:description=>"Work Id", :key=>"workId", :tooltip=>"The full Work Identification"}]
  }
]

dogs = [
  {:name => "Toby", :description => "Rankin's dog"},
  {:name => "Rumble", :description => "Aunty Mary's dog"},
  {:name => "Lola", :description => "Claire Dixon's dog"}
  ]
cats = [
  {:name => "Elvis", :description => "Wee gay cat"},
  {:name => "Purr-y cat", :description => "Dont know much about it"},
  ]
pets = [dogs, cats]

get '/dogs' do
  @dogs = dogs
  erb :dogs
end

get '/dogs.json' do
	content_type :json
	dogs.to_json
end

get '/templating' do
  @dogs = dogs
  erb :templating
end

get '/sortable' do
  erb :sortable
end

get '/jsonEdit' do
  erb :jsonEdit
end

