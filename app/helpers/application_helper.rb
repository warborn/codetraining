module ApplicationHelper
	def js_path(controller_name, action_name)
		"#{Rails.root}/app/views/#{controller_name.to_s}/js/#{action_name.to_s}.js"
	end
end
