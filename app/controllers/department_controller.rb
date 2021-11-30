class DepartmentController < ApplicationController
  get '/department/list' do
    resp = nil
    status = 200
    begin
      resp = Department.all().to_a.to_json
    rescue Exception => e
      resp = {
        :tipo_mensaje => 'error',
        :mensaje => [
          'Se ha producido un error en listar los departamentos',
          e.message
        ]
      }.to_json
      status = 500
    end
    status status
    resp
  end

  get '/department/search' do
    resp = nil
    status = 200
    begin
      list = Department.where(
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
      resp = {
        :tipo_mensaje => 'error',
        :mensaje => [
          'Se ha producido un error en buscar coincidencias en los nombres de los departamentos',
          e.message
        ]
      }.to_json
      status = 500
    end
    status status
    resp
  end

  post '/department/save' do
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
            tmp = Department.new(
              :name => n['name']
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
            tmp = Department.where(
              :id => e['id']
            ).first
            tmp.name = e['name']
            tmp.save
          end
        end
        if deletes.length != 0
          deletes.each do |d|
            Department.where(
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
      resp = ['Se ha registrado los cambios en los departamentos',array_news].to_json
    else
      status = 500
      resp = [
        'Se ha producido un error en guardar la tabla de departamentos',
        execption.message].to_json
    end
    status status
    resp
  end
end