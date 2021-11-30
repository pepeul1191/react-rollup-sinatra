class LoginController < ApplicationController
  ['/login', '/login/sign-in', '/login/reset-password'].each do |path|
    get path do
      locals = {}
      erb :'login/index', :locals => locals
    end
  end
end