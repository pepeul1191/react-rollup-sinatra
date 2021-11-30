class SpecialismController < ApplicationController
	get '/specialism/list' do
		resp = nil
		status = 200
		begin
			resp = Specialism.all().to_a.to_json
		rescue Exception => e
			resp = [
					'Se ha producido un error en listar las espcialidades',
					e.message
				].to_json
			status = 500
		end
		status status
		resp
	end

	post '/specialism/save' do
		resp = nil
		status = 200
		payload = JSON.parse(request.body.read)
		news = payload['news']
		edits = payload['edits']
		deletes = payload['deletes']
		resp = []
		array_news = []
		error = false
		execption = nil
		DB.transaction do
			begin
				if news.length != 0
					news.each do |n|
						tmp = Specialism.new(
							:name => n['name'],
						)
						tmp.save
						t = {
							:tmp => n['id'],
							:id => tmp.id
						}
						array_news.push(t)
					end
				end
				if edits.length != 0
					edits.each do |e|
						tmp = Specialism.where(
							:id => e['id']
						).first
						tmp.name = e['name']
						tmp.save
					end
				end
				if deletes.length != 0
					deletes.each do |d|
						Specialism.where(
							:id => d['id']
					).delete
					end
				end
			rescue Exception => e
				Sequel::Rollback
				error = true
				execption = e
			end
		end
		if error == false
			resp = ['Se ha registrado los cambios en las especialides',array_news].to_json
		else
			status = 500
			resp = [
				'Se ha producido un error en guardar la tabla de especialidades',
				execption.message].to_json
		end
		status status
		resp
	end
end