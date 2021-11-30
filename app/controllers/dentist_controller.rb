class DentistController < ApplicationController
  get '/dentist/list' do
    resp = nil
    status = 200
    begin
      name = params[:name]
      cop = params[:cop]
      rne = params[:rne]
      page = params[:page]
      step = params[:step]
      query = Dentist.select(:id, :name, :cop, :rne)
      # wheres
      if name != nil
        query = query.where(
					Sequel.like(:name, '%' + name + '%')
				)
      end
      if cop != nil
        query = query.where(
					Sequel.like(:cop, '%' + cop + '%')
				)
      end
      if rne != nil
        query = query.where(
					Sequel.like(:rne, '%' + rne + '%')
				)
      end
      # pagination
      if (page != nil and step != nil)
        count = query.count
        offset = (page.to_i - 1) * step.to_i
        query = query.offset(offset).limit(step)
        # do query
        #resp[:data] = query.to_a
        resp = {
          :list => query.to_a,
          :pages => (count * 1.0 / step.to_i).ceil()
        }.to_json
      else
        # do query
        resp = query.to_a.to_json
      end
    rescue Exception => e
      puts e.backtrace
      resp = {
        :tipo_mensaje => 'error',
        :mensaje => [
          'Se ha producido un error en listar los dentistas',
          e.message
        ]
      }.to_json
      status = 500
    end
    status status
    resp
  end

  post '/dentist/save' do
    resp = nil
    status = 200
    payload = JSON.parse(request.body.read)
    deletes = payload['deletes']
    resp = []
    array_news = []
    error = false
    execption = nil
    DB.transaction do
      begin
        if deletes.length != 0
          deletes.each do |d|
            Dentist.where(
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
      resp = ['Se ha registrado los cambios en los dentistas',array_news].to_json
    else
      status = 500
      resp = [
        'Se ha producido un error en guardar la tabla de dentistas',
        execption.message].to_json
    end
    status status
    resp
  end

  get '/dentist/get' do
    resp = nil
    status = 200
    begin
      id = params[:id]
      resp = Dentist.where(:id => id).first.to_json
      if resp == 'null'
        status = 404
      end
    rescue Exception => e
      puts e.backtrace
      resp = [
        'Se ha producido un error en listar las especialidades del dentista',
        e.message
      ].to_json
      status = 500
    end
    status status
    resp
  end

  get '/dentist/specialism/list' do
    resp = nil
    status = 200
    begin
      dentist_id = params[:dentist_id]
      resp = DB.fetch(''' 
        SELECT T.id AS id, T.name AS name, (CASE WHEN (P.exist = 1) THEN 1 ELSE 0 END) AS exist FROM
        (
          SELECT id, name, 0 AS exist FROM specialisms
        ) T 
        LEFT JOIN 
        (
          SELECT C.id, C.name, 1 AS exist FROM 
          specialisms C INNER JOIN dentists_specialisms TC ON
          C.id = TC.specialism_id
          WHERE TC.dentist_id = ?
        ) P 
        ON P.id = T.id
      ''', dentist_id).to_a.to_json
    rescue Exception => e
      puts e.backtrace
      resp = [
        'Se ha producido un error en listar las especialidades del dentista',
        e.message
      ].to_json
      status = 500
    end
    status status
    resp
  end

  post '/dentist/specialism/save' do
    resp = nil
		status = 200
		payload = JSON.parse(request.body.read)
		edits = payload['edits']
		dentist_id = payload['extra']['dentist_id']
		resp = []
		array_news = []
		error = false
		execption = nil
		DB.transaction do
			begin
				if edits.length != 0
					edits.each do |e|
						tmp = DentistSpecialism.where(
							:specialism_id => e['id'],
              :dentist_id => dentist_id
						).first
						if e['exist'] == 0
              if tmp != nil
                tmp.delete
              end
            else
              if tmp == nil
                tmp = DentistSpecialism.new(
                  :specialism_id => e['id'],
                  :dentist_id => dentist_id
                )
                tmp.save
              end
            end
					end
				end
			rescue Exception => e
				Sequel::Rollback
				error = true
				execption = e
			end
		end
		if error == false
			resp = ['Se ha asosiado las especialidades al dentista'].to_json
		else
			status = 500
			resp = [
				'Se ha producido un error en asosiar las especialidades al dentista',
				execption.message].to_json
		end
		status status
		resp
	end

  get '/dentist/branch/list' do
    resp = nil
    status = 200
    begin
      dentist_id = params[:dentist_id]
      resp = VWDentistBranch.select(:id, :branch_id, :branch_name).where(
        :dentist_id => dentist_id).all().to_a.to_json
    rescue Exception => e
      resp = {
        :tipo_mensaje => 'error',
        :mensaje => [
          'Se ha producido un error en listar las provincias del departamento',
          e.message
        ]
      }.to_json
      status = 500
    end
    status status
    resp
  end

  post '/dentist/branch/save' do
    resp = nil
		status = 200
		payload = JSON.parse(request.body.read)
		news = payload['news']
    edits = payload['edits']
    deletes = payload['deletes']
		dentist_id = payload['extra']['dentist_id']
		resp = []
		array_news = []
		error = false
		execption = nil
		DB.transaction do
			begin
				if news.length != 0
          news.each do |n|
            tmp = DentistBranch.new(
              :branch_id => n['branch_id'],
              :dentist_id => dentist_id
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
            tmp = DentistBranch.where(
              :id => e['id']
            ).first
            tmp.branch_id = e['branch_id']
            tmp.save
          end
        end
        if deletes.length != 0
          deletes.each do |d|
            DentistBranch.where(
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
			resp = ['Se ha asosiado las sedes al dentista', array_news].to_json
		else
			status = 500
			resp = [
				'Se ha producido un error en asosiar las sedes al dentista',
				execption.message].to_json
		end
		status status
		resp
	end

  post '/dentist/detail/save' do
    resp = nil
		status = 200
		payload = JSON.parse(request.body.read)
    id = payload['id']
		cop = payload['cop']
    name = payload['name']
    image = payload['image']
    rne = payload['rne']
		error = false
		execption = nil
		DB.transaction do
			begin
        if id == 'E'
          n = Dentist.new(
            :cop => cop,
            :name => name,
            :image => image,
            :rne => rne,
          )
          n.save
          resp = n.id.to_s
        else
          e = Dentist.where(:id => id).first
          e.name = name
          e.cop = cop
          e.rne = rne
          e.image = image
          e.save
          resp = ''
        end
			rescue Exception => e
        puts e.backtrace
				Sequel::Rollback
				error = true
				execption = e
			end
		end
		if error == true
			status = 500
			resp = [
				'Se ha producido un error en crear el dentista',
				execption.message].to_json
		end
		status status
		resp
  end
end
