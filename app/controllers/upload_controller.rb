class UploadController < ApplicationController
  post '/upload' do
    status = 200
    resp = ''
    file = params[:file]
    # puts file
    if ['application/pdf', 'image/jpeg', 'image/png'].include? file[:type]
      extension = file[:filename].split('.').last
      new_name = random_string_number(30) + '.' + extension # Helper
      tmp = file[:tempfile].path
      FileUtils.mv(tmp, 'public/uploads/' + new_name)
      resp = 'uploads/' + new_name
    else
      resp = 'formato del archivo no es un PDF'
      status = 500
    end
    status status
    resp
  end
end