class DistrictController < ApplicationController
	get '/district/list/:province_id' do
		resp = nil
		status = 200
		begin
			province_id = params[:province_id]
			resp = District.select(:id, :name).where(
				:province_id => province_id).all().to_a.to_json
		rescue Exception => e
			resp = [
					'Se ha producido un error en listar los distritos de la provincia',
					e.message
				].to_json
			status = 500
		end
		status status
		resp
	end

	post '/district/save' do
		resp = nil
		status = 200
		payload = JSON.parse(request.body.read)
		news = payload['news']
		edits = payload['edits']
		deletes = payload['deletes']
		province_id = payload['extra']['province_id']
		resp = []
		array_news = []
		error = false
		execption = nil
		DB.transaction do
			begin
				if news.length != 0
					news.each do |n|
						tmp = District.new(
							:name => n['name'],
							:province_id => province_id
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
						tmp = District.where(
							:id => e['id']
						).first
						tmp.name = e['name']
						tmp.save
					end
				end
				if deletes.length != 0
					deletes.each do |d|
						District.where(
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
			resp = ['Se ha registrado los cambios en los distritos',array_news].to_json
		else
			status = 500
			resp = [
				'Se ha producido un error en guardar la tabla de distritos',
				execption.message].to_json
		end
		status status
		resp
	end

	get '/district/search' do
		resp = nil
		status = 200
		begin
			list = VWDistrict.where(
					Sequel.like(:name, '%' + params[:name] + '%')
				).limit(10).to_a
			resp = []
			list.each do |e|
				resp.push({
					:id => e.id,
					:name => e.name,
				})
			end
			resp = resp.to_json
		rescue Exception => e
			resp = [
					'Se ha producido un error en buscar coincidencias en los nombres de los distritos',
					e.message
				].to_json
			status = 500
		end
		status status
		resp
	end
end