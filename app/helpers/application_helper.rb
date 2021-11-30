module Helpers
  def css(csss, constants)
    static_url = constants[:static_url]
    resp = ''
    if defined? csss
      csss.each do |file|
        temp = '<link href="' + static_url + file + '.css" rel="stylesheet"/>'
        resp = resp + temp
      end
    end
    resp
  end

  def js(jss = nil, constants)
    static_url = constants[:static_url]
    resp = ''
    if jss != nil
      if defined? jss
        jss.each do |file|
          temp = '<script src="' + static_url + file + '.js" type="text/javascript"></script>'
          resp = resp + temp
        end
      end
    end
    resp
  end

  def check_session_true
    'check_session_true'
  end

  def random_string_number(len)
    o = [('a'..'z'), ('A'..'Z'), (0..9)].map(&:to_a).flatten
    (0...len).map { o[rand(o.length)] }.join
  end

  def random_string(len)
    o = [('a'..'z'), ('A'..'Z'), ].map(&:to_a).flatten
    (0...len).map { o[rand(o.length)] }.join
  end
end