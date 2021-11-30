class BranchController < ApplicationController
	get '/branch/search' do
		resp = nil
		status = 200
		begin
			list = VWBranchType.select(:id, :name).where(
					Sequel.like(:name, '%' + params[:name] + '%')
				).limit(10).to_a
			resp = []
			list.each do |e|
				resp.push({
					:id => e.id,
					:branch_name => e.name,
				})
			end
			resp = resp.to_json
		rescue Exception => e
			resp = [
					'Se ha producido un error en buscar coincidencias en los nombres de los sedes',
					e.message
				].to_json
			status = 500
		end
		status status
		resp
	end

	get '/branch/list_by_type' do
		resp = nil
		status = 200
		branch_type_id = params[:branch_type_id]
		begin
			resp = Branch.select(:id, :name, :address).where(
					:branch_type_id => branch_type_id
				).to_a.to_json
		rescue Exception => e
			branch_type = ['Lima', 'Provincia']
			resp = [
					'Se ha producido un error en buscar las sedes de #{branch_type[branch_type_id]} ',
					e.message
				].to_json
			status = 500
		end
		status status
		resp
	end

	get '/branch/image/list' do 
		resp = nil
		status = 200
		branch_id = params[:branch_id]
		begin
			resp = VWBranchImage.select(:id, :alt, :url).where(
					:branch_id => branch_id
				).to_a.to_json
		rescue Exception => e
			resp = [
					'Se ha producido un error en listar las imágenes de la sede',
					e.message
				].to_json
			status = 500
		end
		status status
		resp
	end

	post '/branch/image/save' do
    resp = nil
    status = 200
    payload = JSON.parse(request.body.read)
    news = payload['news']
    edits = payload['edits']
    deletes = payload['deletes']
		branch_id = payload['extra']['branch_id']
    resp = []
    array_news = []
    error = false
    execption = nil
    DB.transaction do
      begin
        if news.length != 0
          news.each do |n|
						if n['url'] == 'E'
							n['url'] = 'assets/img/default-branch.png'
						end
						# save new image
            tmp = Image.new(
              :alt => n['alt'],
							:url => n['url']
            )
            tmp.save
            t = {
              :tmp => n['id'],
              :id => tmp.id
            }
						array_news.push(t)
						# save new image branch
						bi = BranchImage.new(
							:branch_id => branch_id,
							:image_id => tmp.id
						)
						bi.save
          end
        end
        if edits.length != 0
          edits.each do |e|
            tmp = Image.where(
              :id => e['id']
            ).first
            tmp.alt = e['alt']
						tmp.url = e['url']
            tmp.save
          end
        end
        if deletes.length != 0
          deletes.each do |d|
						BranchImage.where(:image_id => d['id']).delete
            # Image.where(:id => d['id']).delete ???
          end
        end
      rescue Exception => e
				# puts e.backtrace
        Sequel::Rollback
        error = true
        execption = e
      end
    end
    if error == false
      resp = ['Se ha registrado los cambios en las imágenes de la sede',array_news].to_json
    else
      status = 500
      resp = [
        'Se ha producido un error en guardar la tabla de imágenes de la sede',
        execption.message].to_json
    end
    status status
    resp
  end
end