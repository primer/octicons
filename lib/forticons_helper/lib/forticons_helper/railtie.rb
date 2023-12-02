require "rails"

module ForticonsHelper
  class Railtie < Rails::Railtie
    initializer "forticons_helper.helper" do
      ActionView::Base.send :include, ForticonsHelper
    end
  end
end
